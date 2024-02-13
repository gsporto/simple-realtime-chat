import { useUserMessage } from '@/hooks';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormEvent, useState } from 'react';

function UserEditDialog() {
  const { currentUser, setCurrentUser } = useUserMessage();
  const [isOpen, setIsOpen] = useState(!currentUser.name);
  const [name, setName] = useState('');

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name) {
      setIsOpen(false);
      setCurrentUser({ ...currentUser, name });
    }
  }

  function handleOpenChange(open: boolean) {
    if (open === false && currentUser.name) {
      setIsOpen(open);
    }
    setIsOpen(open);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSave}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={e => {
                  setName(e.currentTarget.value);
                }}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { UserEditDialog };
