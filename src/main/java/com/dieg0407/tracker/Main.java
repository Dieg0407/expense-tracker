package com.dieg0407.tracker;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import java.io.File;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.WebSocket;
import java.nio.ByteBuffer;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public class Main {
    public List<String> transcribe(String path) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        WebSocket.Builder builder = client.newWebSocketBuilder();
        WebSocketListener listener = new WebSocketListener();

        CompletableFuture<WebSocket> webSocketFuture = builder.buildAsync(
                URI.create("ws://localhost:2700"),
                listener
        );
        WebSocket socket = webSocketFuture.get();

        File audioFile = new File(path);
        AudioInputStream audioInputStream = AudioSystem.getAudioInputStream(audioFile);
        AudioFormat format = audioInputStream.getFormat();
        int bytesPerFrame = format.getFrameSize();
        if (bytesPerFrame == AudioSystem.NOT_SPECIFIED) {
            bytesPerFrame = 1;
        }
        socket.sendText("{ \"config\" : { \"sample_rate\" : " + (int)format.getSampleRate() + " } }", true).get();

        int totalFramesRead = 0;
        int numBytes = 1024 * bytesPerFrame;
        int numBytesRead = 0;
        int numFramesRead = 0;
        byte[] audioBytes = new byte[numBytes];
        // Try to read numBytes bytes from the file.
        while ((numBytesRead = audioInputStream.read(audioBytes)) != -1) {
            // Calculate the number of frames actually read.
            numFramesRead = numBytesRead / bytesPerFrame;
            totalFramesRead += numFramesRead;
            socket.sendBinary(ByteBuffer.wrap(audioBytes), false).get();
        }
        socket.sendBinary(ByteBuffer.wrap(new byte[]{}), true).get();
        socket.sendText("{\"eof\" : 1}", true).get();
        listener.waitUntilClosed();

        return listener.getMessages();
    }

    public static void main(String[] args) throws Exception {
        Main client = new Main();
        for (String res : client.transcribe("test.wav")) {
            System.out.println(res);
        }
    }
}