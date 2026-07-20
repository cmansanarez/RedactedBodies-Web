INSERT INTO projects (project_name, img_url, project_description, url)
VALUES (
  'Signal Bloom',
  'signal-bloom-modulate-logo.png',
  'A modular AI-assisted live visual performance environment merging Hydra live coding, generative AI imagery via ComfyUI, and audio-reactive systems into a unified performance instrument. The project investigates what happens when AI generation itself becomes performative — treating image creation not as a pre-authored asset, but as an event that unfolds in real time through improvisation between human and machine.',
  'https://signal-bloom.noirmak.com'
);

SELECT LAST_INSERT_ID();


-- ============================================================
-- Redacted Bodies gallery — artworks table (Module 13)
-- ============================================================

CREATE TABLE artworks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  numeral VARCHAR(10) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  prompt TEXT NOT NULL
);

INSERT INTO artworks (numeral, image_url, prompt) VALUES
('I', 'redacted-bodies-gen-01.png', 'NoirmakStyle, digital artwork featuring two luminous classical marble figures surrounded by abstract botanical forms, vibrant cyan and magenta atmosphere, surreal composition, glowing signal traces, textured digital painting, harmonious symmetry, rule of thirds'),
('II', 'redacted-bodies-gen-02.png', 'NoirmakStyle, portrait emerging through compression artifacts, erased identity, chromatic aberration, digital noise, atmospheric glow'),
('III', 'redacted-bodies-gen-03.png', 'NoirmakStyle, queer body emerging from digital bloom, fragmented light, datamosh artifacts, signal reconstruction'),
('IV', 'redacted-bodies-gen-04.png', 'NoirmakStyle, queer identity indexed as machine archive, glitch blocks, scanline distortion, digital deterioration'),
('V', 'redacted-bodies-gen-05.png', 'NoirmakStyle, portrait hidden beneath algorithmic masking, signal corruption, chromatic bloom, black background'),
('VI', 'redacted-bodies-gen-06.png', 'NoirmakStyle, two abstract humanoid forms facing one another, digital duplicate reflections, overlapping signal structures, surreal dialogue, painterly textures'),
('VII', 'redacted-bodies-gen-07.png', 'NoirmakStyle, body reconstructed from fragmented digital memory, translucent crystalline surfaces, corrupted scanlines, neon cyan and magenta bloom, machine hallucination'),
('VIII', 'redacted-bodies-gen-08.png', 'NoirmakStyle, radiant human silhouette blooming into crystalline light, fragmented pixels dissolving into organic geometry, RGB split, atmospheric haze'),
('IX', 'redacted-bodies-gen-09.png', 'NoirmakStyle, luminous skeletal figure assembled from broken transmission fragments, crystalline structure, neon cyan, magenta highlights, black void'),
('X', 'redacted-bodies-gen-10.png', 'NoirmakStyle, fragmented angelic figure reconstructed from corrupted transmission, glitch sculpture, atmospheric glow'),
('XI', 'redacted-bodies-gen-11.png', 'NoirmakStyle, surreal digital artwork featuring blooming recursive geometry, atmospheric cyan light, glowing marble textures, abstract computational landscape'),
('XII', 'redacted-bodies-gen-12.png', 'NoirmakStyle, angelic figure with blue hues, ethereal, emerging from the mist');

SELECT * FROM artworks ORDER BY id ASC;
