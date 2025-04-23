import Foundation
import Capacitor
import AVFoundation

@objc(AudioHelperPlugin)
public class AudioHelperPlugin: CAPPlugin {
    private var audioPlayer: AVPlayer?
    private var timeObserverToken: Any?
    private var isPlaying = false
    
    @objc func play(_ call: CAPPluginCall) {
        guard let urlString = call.getString("url") else {
            call.reject("Must provide a URL")
            return
        }
        
        guard let url = URL(string: urlString) else {
            call.reject("Invalid URL provided")
            return
        }
        
        // Configure audio session
        do {
            try AVAudioSession.sharedInstance().setCategory(.playback, mode: .default)
            try AVAudioSession.sharedInstance().setActive(true)
        } catch {
            call.reject("Failed to set up audio session", nil, error)
            return
        }
        
        // Create and prepare the player
        let playerItem = AVPlayerItem(url: url)
        
        // If we already have a player, stop it first
        if audioPlayer != nil {
            stop(nil) // Stop existing player
        }
        
        // Create new player
        audioPlayer = AVPlayer(playerItem: playerItem)
        
        // Setup notifications for when playback ends
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(playerItemDidPlayToEndTime),
            name: .AVPlayerItemDidPlayToEndTime,
            object: playerItem
        )
        
        // Start playback
        audioPlayer?.play()
        isPlaying = true
        
        // Add periodic time observer to monitor playback
        addPeriodicTimeObserver()
        
        call.resolve([
            "status": "playing",
            "url": urlString
        ])
    }
    
    @objc func pause(_ call: CAPPluginCall?) {
        guard let player = audioPlayer else {
            call?.reject("No active player")
            return
        }
        
        player.pause()
        isPlaying = false
        
        call?.resolve([
            "status": "paused"
        ])
    }
    
    @objc func resume(_ call: CAPPluginCall) {
        guard let player = audioPlayer else {
            call.reject("No active player")
            return
        }
        
        player.play()
        isPlaying = true
        
        call.resolve([
            "status": "playing"
        ])
    }
    
    @objc func stop(_ call: CAPPluginCall?) {
        guard audioPlayer != nil else {
            call?.reject("No active player")
            return
        }
        
        // Remove the time observer
        if let timeObserverToken = timeObserverToken {
            audioPlayer?.removeTimeObserver(timeObserverToken)
            self.timeObserverToken = nil
        }
        
        // Stop and release player
        audioPlayer?.pause()
        audioPlayer?.replaceCurrentItem(with: nil)
        audioPlayer = nil
        isPlaying = false
        
        // Remove observer
        NotificationCenter.default.removeObserver(self, name: .AVPlayerItemDidPlayToEndTime, object: nil)
        
        call?.resolve([
            "status": "stopped"
        ])
    }
    
    @objc func getStatus(_ call: CAPPluginCall) {
        if let player = audioPlayer {
            call.resolve([
                "isPlaying": isPlaying,
                "currentTime": player.currentTime().seconds
            ])
        } else {
            call.resolve([
                "isPlaying": false,
                "currentTime": 0
            ])
        }
    }
    
    private func addPeriodicTimeObserver() {
        // Notify JS about playback progress every second
        let timeScale = CMTimeScale(NSEC_PER_SEC)
        let time = CMTime(seconds: 1.0, preferredTimescale: timeScale)
        
        timeObserverToken = audioPlayer?.addPeriodicTimeObserver(forInterval: time, queue: .main) { [weak self] time in
            guard let self = self else { return }
            
            // Check if player is still active
            if self.audioPlayer?.currentItem?.status == .failed {
                self.notifyListeners("error", data: [
                    "message": "Playback failed"
                ])
                self.stop(nil)
            }
            
            // Notify about playback progress
            self.notifyListeners("progress", data: [
                "currentTime": time.seconds
            ])
        }
    }
    
    @objc private func playerItemDidPlayToEndTime(notification: Notification) {
        notifyListeners("playbackEnded", data: [:])
        isPlaying = false
    }
    
    // Clean up when plugin is deallocated
    deinit {
        if let timeObserverToken = timeObserverToken {
            audioPlayer?.removeTimeObserver(timeObserverToken)
        }
        NotificationCenter.default.removeObserver(self)
    }
}