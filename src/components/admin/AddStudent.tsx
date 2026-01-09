import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export const AddStudent = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    moodle_username: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('students')
        .insert([
          {
            email: formData.email,
            name: formData.name,
            phone: formData.phone || null,
            moodle_username: formData.moodle_username,
            course_access: true,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      toast.success('Aluno cadastrado com sucesso!');
      
      // Reset form
      setFormData({
        email: '',
        name: '',
        phone: '',
        moodle_username: '',
      });
    } catch (error: any) {
      toast.error(error.message || 'Erro ao cadastrar aluno');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Aluno Manualmente</CardTitle>
        <CardDescription>
          Cadastre um novo aluno diretamente no sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              type="text"
              placeholder="Nome do aluno"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@exemplo.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Telefone (opcional)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(11) 99999-9999"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="moodle_username">Usuário Moodle</Label>
            <Input
              id="moodle_username"
              type="text"
              placeholder="usuario_moodle"
              value={formData.moodle_username}
              onChange={(e) => setFormData({ ...formData, moodle_username: e.target.value })}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar Aluno'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
