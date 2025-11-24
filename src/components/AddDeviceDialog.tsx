import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Plus } from 'lucide-react';
import { useApp, Device } from '../context/AppContext';
import { toast } from 'sonner@2.0.3';

export function AddDeviceDialog() {
  const { addDevice } = useApp();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'other' as Device['type'],
    brand: '',
    model: '',
    status: 'working' as Device['status'],
    purchaseDate: '',
    warrantyExpiry: '',
    powerConsumption: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.brand || !formData.model || !formData.purchaseDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newDevice: Device = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      brand: formData.brand,
      model: formData.model,
      status: formData.status,
      purchaseDate: formData.purchaseDate,
      warrantyExpiry: formData.warrantyExpiry || undefined,
      powerConsumption: formData.powerConsumption ? parseInt(formData.powerConsumption) : undefined,
      notes: formData.notes || undefined,
      isConnected: true,
    };

    addDevice(newDevice);
    toast.success('Device added successfully!');
    setOpen(false);
    setFormData({
      name: '',
      type: 'other',
      brand: '',
      model: '',
      status: 'working',
      purchaseDate: '',
      warrantyExpiry: '',
      powerConsumption: '',
      notes: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-primary text-white btn-shadow hover:scale-[1.02] transition-transform">
          <Plus className="w-4 h-4 mr-2" />
          Add Device
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Device</DialogTitle>
          <DialogDescription>
            Add your home devices to monitor status and schedule maintenance.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Device Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Living Room AC"
                required
              />
            </div>

            <div>
              <Label htmlFor="type">Device Type *</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value: Device['type']) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="refrigerator">Refrigerator</SelectItem>
                  <SelectItem value="air-conditioner">Air Conditioner</SelectItem>
                  <SelectItem value="washing-machine">Washing Machine</SelectItem>
                  <SelectItem value="water-heater">Water Heater</SelectItem>
                  <SelectItem value="tv">TV</SelectItem>
                  <SelectItem value="fan">Fan</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="brand">Brand *</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="e.g., Samsung, LG, Haier"
                required
              />
            </div>

            <div>
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                placeholder="e.g., AR12TXHQASINEU"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Current Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: Device['status']) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="working">Working</SelectItem>
                  <SelectItem value="needs-service">Needs Service</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="powerConsumption">Power Consumption (Watts)</Label>
              <Input
                id="powerConsumption"
                type="number"
                value={formData.powerConsumption}
                onChange={(e) => setFormData({ ...formData, powerConsumption: e.target.value })}
                placeholder="e.g., 1500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="purchaseDate">Purchase Date *</Label>
              <Input
                id="purchaseDate"
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="warrantyExpiry">Warranty Expiry</Label>
              <Input
                id="warrantyExpiry"
                type="date"
                value={formData.warrantyExpiry}
                onChange={(e) => setFormData({ ...formData, warrantyExpiry: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional information about the device..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 gradient-primary text-white">
              Add Device
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}