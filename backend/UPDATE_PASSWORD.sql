-- Script SQL per aggiornare la password admin direttamente nel database
-- 
-- IMPORTANTE: Prima di eseguire, devi generare l'hash bcrypt della password.
-- Puoi usare questo comando Node.js per generare l'hash:
-- node -e "const bcrypt = require('bcrypt'); bcrypt.hash('naberjwz0doxhswcxqa9d0x276btymh2', 10).then(hash => console.log(hash));"
--
-- Oppure usa questo endpoint per generare l'hash: /api/generate-password-hash

-- Sostituisci 'HASH_QUI' con l'hash bcrypt generato
UPDATE "user" 
SET "password_hash" = 'HASH_QUI', 
    "updated_at" = NOW() 
WHERE "email" = 'bareuropa.ecommerce@gmail.com';

-- Verifica che sia stata aggiornata
SELECT "id", "email", "password_hash" IS NOT NULL as has_password 
FROM "user" 
WHERE "email" = 'bareuropa.ecommerce@gmail.com';

