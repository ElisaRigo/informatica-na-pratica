import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CreditCard, Lock, ShieldCheck, CheckCircle2, AlertCircle, QrCode, FileText } from "lucide-react";
import logoImage from "@/assets/logo-new.png";
import { Card, CardContent } from "@/components/ui/card";


export const CheckoutTransparente = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: ""
  });

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name || !formData.email || !formData.phone || !formData.cpf) {
      toast({
        title: "Preencha todos os campos",
        description: "Todos os campos são obrigatórios para continuar",
        variant: "destructive"
      });
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    const cleanCPF = formData.cpf.replace(/\D/g, '');

    if (cleanPhone.length !== 11) {
      toast({
        title: "Telefone inválido",
        description: "Digite um telefone válido com DDD",
        variant: "destructive"
      });
      return;
    }

    if (cleanCPF.length !== 11) {
      toast({
        title: "CPF inválido",
        description: "Digite um CPF válido",
        variant: "destructive"
      });
      return;
    }

    // Redirecionar para o checkout do PagSeguro
    setLoading(true);
    window.location.href = 'https://pag.ae/7-LepVEPT';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header com Logo e Valor - Centralizado */}
      <div className="text-center pb-6 border-b-2 border-primary/10">
        <div className="flex flex-col items-center justify-center gap-3 mb-6">
          <img src={logoImage} alt="Informática na Prática" className="h-12 w-auto" />
          <div className="text-center">
            <h3 className="text-lg font-bold text-foreground">Pagamento Seguro</h3>
            <p className="text-sm text-foreground/70">Informática na Prática</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl p-5 max-w-md mx-auto border border-primary/20">
          <p className="text-sm font-semibold text-foreground mb-2">Valor total do curso:</p>
          <p className="text-4xl font-black text-gradient mb-2">R$ 297,00</p>
          <p className="text-sm text-foreground/80 font-medium">ou em até 12x no cartão*</p>
          <p className="text-xs text-foreground/60 mt-1">*parcelamento sujeito a juros da operadora</p>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent hover:border-primary/40 transition-colors">
          <CardContent className="pt-5 pb-5 flex flex-col items-center text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-bold text-sm text-foreground">Pagamento Seguro</h4>
            <p className="text-xs text-foreground/70">Certificado PCI-DSS</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent hover:border-primary/40 transition-colors">
          <CardContent className="pt-5 pb-5 flex flex-col items-center text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <h4 className="font-bold text-sm text-foreground">Acesso Imediato</h4>
            <p className="text-xs text-foreground/70">Após confirmação</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent hover:border-primary/40 transition-colors">
          <CardContent className="pt-5 pb-5 flex flex-col items-center text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-accent" />
            </div>
            <h4 className="font-bold text-sm text-foreground">Dados Protegidos</h4>
            <p className="text-xs text-foreground/70">Criptografia SSL</p>
          </CardContent>
        </Card>
      </div>

      {/* Métodos de Pagamento Disponíveis */}
      <div className="bg-gradient-to-br from-muted/30 to-transparent rounded-xl p-5 border border-primary/10">
        <h3 className="text-center text-base font-bold text-foreground mb-4">Formas de pagamento disponíveis:</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="border border-primary/20 rounded-lg p-4 flex flex-col items-center gap-2 bg-card">
            <CreditCard className="w-8 h-8 text-primary" />
            <span className="font-bold text-sm text-foreground">Cartão de Crédito</span>
            <span className="text-xs text-foreground/70">em até 12x</span>
          </div>

          <div className="border border-primary/20 rounded-lg p-4 flex flex-col items-center gap-2 bg-card">
            <QrCode className="w-8 h-8 text-primary" />
            <span className="font-bold text-sm text-foreground">Pix</span>
            <span className="text-xs text-foreground/70">aprovação instantânea</span>
          </div>

          <div className="border border-primary/20 rounded-lg p-4 flex flex-col items-center gap-2 bg-card">
            <FileText className="w-8 h-8 text-primary" />
            <span className="font-bold text-sm text-foreground">Boleto</span>
            <span className="text-xs text-foreground/70">compensação em 3 dias</span>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <Card className="border-2 border-primary/30 shadow-xl bg-gradient-to-br from-card via-card to-primary/5">
        <CardContent className="pt-6 pb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dados Pessoais */}
            <div className="space-y-4 bg-muted/20 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground">Seus Dados</h3>
              </div>
    
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone com DDD *</Label>
                  <Input
                    id="phone"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                    maxLength={15}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
                    maxLength={14}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Security Banner */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-2 border-primary/30 rounded-xl p-5 shadow-inner">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-foreground flex items-center gap-2 text-base">
                    Pagamento 100% Seguro
                    <ShieldCheck className="w-5 h-5 text-success" />
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Seus dados são <strong className="text-foreground">criptografados</strong> e processados de forma segura pelo PagSeguro. 
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground pt-1">
                    <span className="bg-primary/10 px-2 py-1 rounded-md">🔒 Certificado PCI-DSS</span>
                    <span className="bg-success/10 px-2 py-1 rounded-md">🛡️ Proteção SSL/TLS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Alert */}
            {loading && (
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 flex items-start gap-3 animate-pulse">
                <AlertCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">Redirecionando para página de pagamento...</p>
                  <p className="text-muted-foreground mt-1">Aguarde um momento</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full font-bold text-lg py-7 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
              disabled={loading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Redirecionando...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-5 w-5" />
                  Ir para Pagamento - R$ 297,00
                </>
              )}
            </Button>

            {/* Footer Info */}
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-success/20 to-accent/20 border-2 border-success/40 rounded-xl p-5 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-foreground mb-2">
                      🎓 Acesso Imediato ao Curso!
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Após a confirmação do pagamento, você receberá um <strong className="text-foreground">e-mail com seus dados de acesso</strong> em até 5 minutos e poderá iniciar suas aulas imediatamente! Verifique também sua caixa de spam.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Os dados não são armazenados em nosso servidor
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-success" />
                  Processamento Seguro
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-success" />
                  Dados Criptografados
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-success" />
                  Garantia 7 Dias
                </span>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
