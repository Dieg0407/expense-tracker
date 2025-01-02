package com.dieg0407.tracker.infrastructure;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import java.io.File;
import java.net.URL;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class LocalAudioParserTest {
    private static LocalAudioParser localAudioParser;

    @BeforeAll
    static void beforeAll() {
        localAudioParser = new LocalAudioParser();
    }

    @Test
    void shouldParseAudioFile() throws Exception {
        final URL resource = LocalAudioParserTest.class.getClassLoader().getResource("test.wav");
        assertThat(resource).isNotNull();

        final File file = new File(resource.toURI());
        assertThat(file).isNotNull();

        final List<String> messages =  localAudioParser.parse(file);
        assertThat(messages)
                .isNotNull()
                .isNotEmpty();
    }
}
