import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CreditCard } from 'lucide-react';
import { useApp, PaymentMethod } from '../context/AppContext';
import { toast } from 'sonner@2.0.3';

export function AddPaymentMethodDialog() {
  const { addPaymentMethod, paymentMethods } = useApp();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'credit-card' as PaymentMethod['type'],
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    phoneNumber: '',
    bankName: '',
    accountNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: formData.type,
      isDefault: paymentMethods.length === 0,
    };

    // Add type-specific fields
    if (formData.type === 'credit-card' || formData.type === 'debit-card') {
      if (!formData.cardNumber || !formData.cardholderName || !formData.expiryDate) {
        toast.error('Please fill in all card details');
        return;
      }
      newMethod.cardNumber = formData.cardNumber.slice(-4);
      newMethod.cardholderName = formData.cardholderName;
      newMethod.expiryDate = formData.expiryDate;
    } else if (formData.type === 'jazzcash' || formData.type === 'easypaisa') {
      if (!formData.phoneNumber) {
        toast.error('Please enter phone number');
        return;
      }
      newMethod.phoneNumber = formData.phoneNumber;
    } else if (formData.type === 'bank-transfer') {
      if (!formData.bankName || !formData.accountNumber) {
        toast.error('Please fill in bank details');
        return;
      }
      newMethod.bankName = formData.bankName;
      newMethod.accountNumber = formData.accountNumber.slice(-4);
    }

    addPaymentMethod(newMethod);
    toast.success('Payment method added successfully!');
    setOpen(false);
    setFormData({
      type: 'credit-card',
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      phoneNumber: '',
      bankName: '',
      accountNumber: '',
    });
  };

  const renderFormFields = () => {
    switch (formData.type) {
      case 'credit-card':
      case 'debit-card':
        return (
          <>
            <div>
              <Label htmlFor="cardholderName">Cardholder Name *</Label>
              <Input
                id="cardholderName"
                value={formData.cardholderName}
                onChange={(e) => setFormData({ ...formData, cardholderName: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <Label htmlFor="cardNumber">Card Number *</Label>
              <Input
                id="cardNumber"
                value={formData.cardNumber}
                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required
              />
            </div>
            <div>
              <Label htmlFor="expiryDate">Expiry Date *</Label>
              <Input
                id="expiryDate"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                placeholder="MM/YY"
                maxLength={5}
                required
              />
            </div>
          </>
        );

      case 'jazzcash':
      case 'easypaisa':
        return (
          <div>
            <Label htmlFor="phoneNumber">Phone Number *</Label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              placeholder="03XX-XXXXXXX"
              required
            />
          </div>
        );

      case 'bank-transfer':
        return (
          <>
            <div>
              <Label htmlFor="bankName">Bank Name *</Label>
              <Input
                id="bankName"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                placeholder="e.g., HBL, MCB, UBL"
                required
              />
            </div>
            <div>
              <Label htmlFor="accountNumber">Account Number *</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                placeholder="XXXXXXXXXXXX"
                required
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-primary text-white btn-shadow hover:scale-[1.02] transition-transform">
          <CreditCard className="w-4 h-4 mr-2" />
          Add Payment Method
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
          <DialogDescription>
            Add a payment method for quick and secure payments.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="type">Payment Type *</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value: PaymentMethod['type']) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit-card">Credit Card</SelectItem>
                <SelectItem value="debit-card">Debit Card</SelectItem>
                <SelectItem value="jazzcash">JazzCash</SelectItem>
                <SelectItem value="easypaisa">Easypaisa</SelectItem>
                <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {renderFormFields()}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 gradient-primary text-white">
              Add Method
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}