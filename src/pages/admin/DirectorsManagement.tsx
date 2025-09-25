import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Director {
  id: string;
  name: string;
  value: string;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export default function DirectorsManagement() {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', value: '' });
  const { toast } = useToast();

  useEffect(() => {
    fetchDirectors();
  }, []);

  const fetchDirectors = async () => {
    try {
      const { data, error } = await supabase
        .from('directors')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setDirectors(data || []);
    } catch (error) {
      console.error('Error fetching directors:', error);
      toast({
        title: "Error",
        description: "Failed to fetch directors",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.value.trim()) return;

    try {
      if (editingId) {
        const { error } = await supabase
          .from('directors')
          .update({ 
            name: formData.name.trim(), 
            value: formData.value.trim().toLowerCase().replace(/\s+/g, '-')
          })
          .eq('id', editingId);

        if (error) throw error;
        toast({ title: "Success", description: "Director updated successfully" });
      } else {
        const maxOrder = Math.max(...directors.map(d => d.display_order), 0);
        const { error } = await supabase
          .from('directors')
          .insert({
            name: formData.name.trim(),
            value: formData.value.trim().toLowerCase().replace(/\s+/g, '-'),
            display_order: maxOrder + 1
          });

        if (error) throw error;
        toast({ title: "Success", description: "Director added successfully" });
      }

      setFormData({ name: '', value: '' });
      setEditingId(null);
      fetchDirectors();
    } catch (error) {
      console.error('Error saving director:', error);
      toast({
        title: "Error",
        description: "Failed to save director",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (director: Director) => {
    setEditingId(director.id);
    setFormData({ name: director.name, value: director.value });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this director?')) return;

    try {
      const { error } = await supabase
        .from('directors')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Director deleted successfully" });
      fetchDirectors();
    } catch (error) {
      console.error('Error deleting director:', error);
      toast({
        title: "Error",
        description: "Failed to delete director",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (id: string, active: boolean) => {
    try {
      const { error } = await supabase
        .from('directors')
        .update({ active })
        .eq('id', id);

      if (error) throw error;
      toast({ 
        title: "Success", 
        description: `Director ${active ? 'activated' : 'deactivated'} successfully` 
      });
      fetchDirectors();
    } catch (error) {
      console.error('Error updating director status:', error);
      toast({
        title: "Error",
        description: "Failed to update director status",
        variant: "destructive",
      });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', value: '' });
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading directors...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Directors Management</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Director' : 'Add New Director'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Director Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Rob B."
                  required
                />
              </div>
              <div>
                <Label htmlFor="value">Value (auto-generated from name)</Label>
                <Input
                  id="value"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="e.g., rob-b"
                  required
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">
                {editingId ? 'Update Director' : 'Add Director'}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Directors ({directors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {directors.map((director) => (
              <div
                key={director.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{director.name}</h3>
                  <p className="text-sm text-muted-foreground">Value: {director.value}</p>
                  <p className="text-sm text-muted-foreground">Order: {director.display_order}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`active-${director.id}`} className="text-sm">
                      Active
                    </Label>
                    <Switch
                      id={`active-${director.id}`}
                      checked={director.active}
                      onCheckedChange={(checked) => toggleActive(director.id, checked)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(director)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(director.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {directors.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                No directors found. Add one above.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}