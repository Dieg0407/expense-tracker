package com.dieg0407.tracker.domain;

import javax.sound.sampled.AudioInputStream;
import java.io.File;
import java.util.List;

public interface AudioParser {
    List<String> parse(File audioFile);

    List<String> parse(AudioInputStream audioInputStream);
}
