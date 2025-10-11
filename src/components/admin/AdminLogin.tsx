import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success('Login realizado com sucesso!');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-2">Painel Administrativo</h1>
          <p className="text-center text-muted-foreground mb-8">
            Entre com suas credenciais de administrador
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>

            <div className="flex flex-col gap-2 text-center">
              <button
                type="button"
                onClick={async () => {
                  if (!email) {
                    toast.error('Digite seu e-mail primeiro');
                    return;
                  }
                  try {
                    const { error } = await supabase.auth.resetPasswordForEmail(email, {
                      redirectTo: `${window.location.origin}/admin`
                    });
                    if (error) throw error;
                    toast.success('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
                  } catch (error: any) {
                    toast.error(error.message || 'Erro ao enviar e-mail de recuperação');
                  }
                }}
                className="text-sm text-primary hover:underline"
              >
                Esqueci minha senha
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/register')}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Criar primeira conta admin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
