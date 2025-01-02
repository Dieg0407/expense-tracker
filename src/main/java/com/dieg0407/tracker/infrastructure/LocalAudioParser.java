package com.dieg0407.tracker.infrastructure;

import com.dieg0407.tracker.domain.AudioParser;

import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.nio.ByteBuffer;
import java.util.List;
import java.util.concurrent.ExecutionException;

public class LocalAudioParser implements AudioParser {

    @Override
    public List<String> parse(File audioFile) {
        try(var audioInputStream = AudioSystem.getAudioInputStream(audioFile)) {
            return parse(audioInputStream);
        } catch (IOException | UnsupportedAudioFileException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<String> parse(AudioInputStream audioInputStream) {
        var client = HttpClient.newHttpClient();
        var builder = client.newWebSocketBuilder();
        var listener = new WebSocketListener();

        var webSocketFuture = builder.buildAsync(
                URI.create("ws://localhost:2700"),
                listener
        );
        try {
            var socket = webSocketFuture.get();
            var format = audioInputStream.getFormat();
            var bytesPerFrame = format.getFrameSize();

            if (bytesPerFrame == AudioSystem.NOT_SPECIFIED) {
                bytesPerFrame = 1;
            }
            socket.sendText("{ \"config\" : { \"sample_rate\" : " + (int)format.getSampleRate() + " } }", true).get();

            int numBytes = 1024 * bytesPerFrame;
            byte[] audioBytes = new byte[numBytes];
            // Try to read numBytes bytes from the file.
            while (audioInputStream.read(audioBytes) != -1) {
                // Calculate the number of frames actually read.
                socket.sendBinary(ByteBuffer.wrap(audioBytes), false).get();
            }
            socket.sendBinary(ByteBuffer.wrap(new byte[]{}), true).get();
            socket.sendText("{\"eof\" : 1}", true).get();
            listener.waitUntilClosed();

            return listener.getMessages();
        } catch (InterruptedException | ExecutionException | IOException e) {
            throw new RuntimeException(e);
        }
    }
}
