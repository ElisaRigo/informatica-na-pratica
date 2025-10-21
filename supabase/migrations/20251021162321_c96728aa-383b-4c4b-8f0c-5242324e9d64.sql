-- Adicionar constraint UNIQUE em pagseguro_transaction_id
-- Primeiro, remover duplicatas se existirem
DELETE FROM payments a USING payments b
WHERE a.id > b.id 
AND a.pagseguro_transaction_id = b.pagseguro_transaction_id;

-- Agora adicionar a constraint
ALTER TABLE payments 
ADD CONSTRAINT payments_pagseguro_transaction_id_unique 
UNIQUE (pagseguro_transaction_id);