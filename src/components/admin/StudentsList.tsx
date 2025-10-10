import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Student {
  id: string;
  email: string;
  name: string;
  moodle_username: string | null;
  course_access: boolean;
  created_at: string;
}

export const StudentsList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setStudents(data || []);
    } catch (error: any) {
      toast.error('Erro ao carregar alunos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando alunos...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Alunos</CardTitle>
        <CardDescription>
          Total de {students.length} aluno{students.length !== 1 ? 's' : ''} cadastrado{students.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {students.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Nenhum aluno cadastrado ainda
          </p>
        ) : (
          <div className="space-y-4">
            {students.map((student) => (
              <div
                key={student.id}
                className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                  </div>
                  <Badge variant={student.course_access ? 'default' : 'secondary'}>
                    {student.course_access ? 'Acesso Ativo' : 'Sem Acesso'}
                  </Badge>
                </div>
                {student.moodle_username && (
                  <p className="text-sm text-muted-foreground">
                    Usuário Moodle: {student.moodle_username}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Cadastrado em: {new Date(student.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
