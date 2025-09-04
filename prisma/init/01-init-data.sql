-- Insertar algunos Loopers de ejemplo
INSERT INTO loopers (id, full_name, email, description) VALUES
  ('looper_001', 'Ana García', 'ana.garcia@tech.com', 'Desarrolladora Senior Full Stack con 8 años de experiencia en React, Node.js y Python. Apasionada por la IA y el desarrollo sostenible.'),
  ('looper_002', 'Carlos Rodríguez', 'carlos.rodriguez@data.com', 'Data Scientist con experiencia en Machine Learning, Big Data y análisis predictivo. Especializado en Python, TensorFlow y AWS.'),
  ('looper_003', 'María López', 'maria.lopez@cloud.com', 'DevOps Engineer experta en Kubernetes, Docker, AWS y CI/CD. 6 años implementando infraestructura como código.'),
  ('looper_004', 'David Martín', 'david.martin@mobile.com', 'Desarrollador Mobile nativo con 7 años en iOS y Android. Especializado en Swift, Kotlin y React Native.'),
  ('looper_005', 'Laura Fernández', 'laura.fernandez@ux.com', 'UX/UI Designer con enfoque en diseño centrado en el usuario. Experiencia en Figma, Adobe Creative Suite y investigación de usuarios.');

-- Insertar algunos perfiles de ejemplo
INSERT INTO profiles (id, full_name, email) VALUES
  ('profile_001', 'Juan Pérez', 'juan.perez@email.com'),
  ('profile_002', 'Sofía Torres', 'sofia.torres@email.com'),
  ('profile_003', 'Miguel Ruiz', 'miguel.ruiz@email.com');

-- Insertar CVs de ejemplo
INSERT INTO cv (id, file_path) VALUES
  ('cv_001', '/uploads/cv/juan_perez_cv.pdf'),
  ('cv_002', '/uploads/cv/sofia_torres_cv.pdf'),
  ('cv_003', '/uploads/cv/miguel_ruiz_cv.pdf');

-- Actualizar perfiles con CV IDs
UPDATE profiles SET cv_id = 'cv_001' WHERE id = 'profile_001';
UPDATE profiles SET cv_id = 'cv_002' WHERE id = 'profile_002';
UPDATE profiles SET cv_id = 'cv_003' WHERE id = 'profile_003';

-- Insertar algunas recomendaciones de ejemplo
INSERT INTO looper_recommendations (id, profile_id, looper_ids, text) VALUES
  ('rec_001', 'profile_001', ARRAY['looper_001', 'looper_002'], 'Juan tiene un perfil muy interesante en desarrollo web. Recomiendo conectar con Ana para temas de React y Carlos para proyectos de IA.'),
  ('rec_002', 'profile_002', ARRAY['looper_003', 'looper_005'], 'Sofía muestra interés en DevOps y UX. Perfecta conexión con María para infraestructura y Laura para diseño de interfaces.'),
  ('rec_003', 'profile_003', ARRAY['looper_004', 'looper_001'], 'Miguel busca oportunidades en desarrollo móvil. Excelente match con David para desarrollo nativo y Ana para proyectos full-stack.');

