INSERT INTO projects (project_name, img_url, project_description, url)
VALUES (
  'Signal Bloom',
  'signal-bloom-modulate-logo.png',
  'A modular AI-assisted live visual performance environment merging Hydra live coding, generative AI imagery via ComfyUI, and audio-reactive systems into a unified performance instrument. The project investigates what happens when AI generation itself becomes performative — treating image creation not as a pre-authored asset, but as an event that unfolds in real time through improvisation between human and machine.',
  'https://signal-bloom.noirmak.com'
);

SELECT LAST_INSERT_ID();


