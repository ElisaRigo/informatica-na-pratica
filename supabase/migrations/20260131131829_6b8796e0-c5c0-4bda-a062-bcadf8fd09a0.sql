-- Criar tabela de leads para capturar intenções de compra
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  cpf TEXT,
  source TEXT DEFAULT 'checkout',
  converted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Índice para busca por email
CREATE INDEX idx_leads_email ON public.leads(email);

-- Índice para busca por data
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);

-- Habilitar RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Permitir INSERT anônimo (para capturar leads no checkout)
CREATE POLICY "Allow anonymous insert on leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Apenas admins podem visualizar leads
CREATE POLICY "Only admins can view leads"
ON public.leads
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Apenas admins podem atualizar leads
CREATE POLICY "Only admins can update leads"
ON public.leads
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Apenas admins podem deletar leads
CREATE POLICY "Only admins can delete leads"
ON public.leads
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Trigger para atualizar updated_at
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();