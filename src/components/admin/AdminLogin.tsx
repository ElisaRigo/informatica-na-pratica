import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se está em modo de recuperação de senha
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get('type');
    
    if (type === 'recovery') {
      setIsRecoveryMode(true);
      toast.info('Por favor, defina sua nova senha');
    }
  }, []);

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

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast.success('Senha atualizada com sucesso!');
      setIsRecoveryMode(false);
      
      // Limpar a hash da URL
      window.history.replaceState(null, '', window.location.pathname);
    } catch (error: any) {
      toast.error(error.message || 'Erro ao atualizar senha');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-2">
            {isRecoveryMode ? 'Redefinir Senha' : 'Painel Administrativo'}
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            {isRecoveryMode 
              ? 'Digite sua nova senha abaixo'
              : 'Entre com suas credenciais de administrador'
            }
          </p>

          {isRecoveryMode ? (
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div>
                <Label htmlFor="newPassword">Nova Senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Atualizando...' : 'Atualizar Senha'}
              </Button>

              <button
                type="button"
                onClick={() => {
                  setIsRecoveryMode(false);
                  window.history.replaceState(null, '', window.location.pathname);
                }}
                className="text-sm text-muted-foreground hover:text-foreground w-full text-center"
              >
                Voltar ao login
              </button>
            </form>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};
