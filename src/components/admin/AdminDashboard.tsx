import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StudentsList } from './StudentsList';
import { AddStudent } from './AddStudent';
import { PaymentsList } from './PaymentsList';
import { AdminSettings } from './AdminSettings';
import { ReprocessPayment } from './ReprocessPayment';
import { LeadsList } from './LeadsList';
import { LogOut, Users, UserPlus, CreditCard, Settings, Target } from 'lucide-react';
import { toast } from 'sonner';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('leads');

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Erro ao sair');
    } else {
      toast.success('Logout realizado com sucesso');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 w-full justify-start gap-2 bg-card border border-border p-2 flex-wrap">
            <TabsTrigger value="leads" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <Target className="w-4 h-4" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="students" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <Users className="w-4 h-4" />
              Alunos
            </TabsTrigger>
            <TabsTrigger value="add" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <UserPlus className="w-4 h-4" />
              Adicionar
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <CreditCard className="w-4 h-4" />
              Pagamentos
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <Settings className="w-4 h-4" />
              Config
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <LeadsList />
          </TabsContent>

          <TabsContent value="students">
            <StudentsList />
          </TabsContent>

          <TabsContent value="add">
            <AddStudent />
          </TabsContent>

          <TabsContent value="payments">
            <div className="space-y-6">
              <ReprocessPayment />
              <PaymentsList />
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
