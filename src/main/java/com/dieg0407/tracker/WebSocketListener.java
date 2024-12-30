package com.dieg0407.tracker;

import java.net.http.WebSocket;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletionStage;

public class WebSocketListener implements WebSocket.Listener {
    private List<String> messages;
    private boolean isClosed;

    public WebSocketListener() {
        messages = new ArrayList<>();
    }

    @Override
    public CompletionStage<?> onText(WebSocket webSocket, CharSequence data, boolean last) {
        messages.add(data.toString());
        return  WebSocket.Listener.super.onText(webSocket, data, last);
    }

    @Override
    public CompletionStage<?> onClose(WebSocket webSocket, int statusCode, String reason) {
        isClosed = true;
        return WebSocket.Listener.super.onClose(webSocket, statusCode, reason);
    }

    public List<String> getMessages() {
        return messages;
    }

    public void waitUntilClosed() throws Exception {
        while (!isClosed) {
            Thread.sleep(1000L);
        }
    }
}
