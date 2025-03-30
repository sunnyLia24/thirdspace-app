import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pause, Trash2, Clock, Info, AlertTriangle, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";

const PauseAccount = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for pause duration
  const [pauseDuration, setPauseDuration] = useState("1 week");
  const [pauseReason, setPauseReason] = useState("");
  
  // State for delete account reason
  const [deleteReason, setDeleteReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  // Dialog states
  const [pauseDialogOpen, setPauseDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"pause" | "delete">("pause");
  const [confirmSuccess, setConfirmSuccess] = useState(false);
  
  const handlePauseAccount = () => {
    // First open the pause dialog
    setPauseDialogOpen(true);
  };
  
  const handleDeleteAccount = () => {
    // First open the delete dialog
    setDeleteDialogOpen(true);
  };
  
  const confirmPauseAccount = () => {
    setPauseDialogOpen(false);
    setActionType("pause");
    setConfirmDialogOpen(true);
  };
  
  const confirmDeleteAccount = () => {
    if (!deleteReason) {
      toast({
        title: "Please select a reason",
        description: "We'd like to understand why you're leaving.",
        variant: "destructive",
      });
      return;
    }
    
    if (deleteReason === "other" && !otherReason.trim()) {
      toast({
        title: "Please provide more information",
        description: "Tell us more about why you're leaving.",
        variant: "destructive",
      });
      return;
    }
    
    if (!confirmDelete) {
      toast({
        title: "Please confirm deletion",
        description: "You need to check the confirmation box to continue.",
        variant: "destructive",
      });
      return;
    }
    
    setDeleteDialogOpen(false);
    setActionType("delete");
    setConfirmDialogOpen(true);
  };
  
  const handleFinalConfirmation = () => {
    // Simulate API call to pause/delete account
    setTimeout(() => {
      setConfirmDialogOpen(false);
      setConfirmSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 1000);
  };
  
  const pauseOptions = [
    { value: "1 week", label: "1 week" },
    { value: "2 weeks", label: "2 weeks" },
    { value: "1 month", label: "1 month" },
    { value: "3 months", label: "3 months" },
  ];
  
  const deleteReasons = [
    { value: "found_match", label: "I found a match" },
    { value: "not_useful", label: "I'm not finding the app useful" },
    { value: "too_many_notifications", label: "Too many notifications" },
    { value: "privacy_concerns", label: "Privacy concerns" },
    { value: "harassment", label: "Experienced harassment" },
    { value: "too_expensive", label: "Subscription is too expensive" },
    { value: "technical_issues", label: "Technical issues" },
    { value: "other", label: "Other reason" },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Pause or Delete Account</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-amber-800 flex items-start gap-2">
            <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <span>
              Need a break or want to leave? You can pause your account temporarily or delete it permanently.
              Choose the option that's right for you.
            </span>
          </p>
        </div>
        
        <div className="space-y-6">
          {/* Pause Account Option */}
          <div className="bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center gap-3 mb-4">
              <Pause className="h-6 w-6 text-blue-500" />
              <h2 className="text-lg font-semibold">Pause Your Account</h2>
            </div>
            
            <p className="text-gray-600 mb-4 text-sm">
              Taking a break? Pause your account temporarily. Your profile won't be 
              visible to others, but your data and matches will be saved.
            </p>
            
            <div className="space-y-4 mb-5">
              <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-md">
                <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-700">What happens when you pause:</p>
                  <ul className="mt-1 space-y-1 list-disc pl-4">
                    <li>Your profile becomes invisible to others</li>
                    <li>You won't receive new matches or messages</li>
                    <li>All your data and existing conversations are preserved</li>
                    <li>You can reactivate your account at any time</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handlePauseAccount}
            >
              Pause My Account
            </Button>
          </div>
          
          {/* Delete Account Option */}
          <div className="bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center gap-3 mb-4">
              <Trash2 className="h-6 w-6 text-red-500" />
              <h2 className="text-lg font-semibold">Delete Your Account</h2>
            </div>
            
            <p className="text-gray-600 mb-4 text-sm">
              Want to leave permanently? Deleting your account will remove all your data 
              and cannot be undone.
            </p>
            
            <div className="space-y-4 mb-5">
              <div className="flex items-start gap-3 bg-red-50 p-3 rounded-md">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div className="text-sm text-red-700">
                  <p className="font-medium">Warning: This action cannot be undone!</p>
                  <ul className="mt-1 space-y-1 list-disc pl-4">
                    <li>All your profile information will be permanently deleted</li>
                    <li>Your matches and conversations will be lost</li>
                    <li>You'll need to create a new account if you want to return</li>
                    <li>Subscription charges will continue until cancelled separately</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleDeleteAccount}
            >
              Delete My Account
            </Button>
          </div>
        </div>
        
        {/* Need Help Section */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
          <p className="text-sm text-center text-gray-600">
            Need help or have questions? <br />
            <span className="text-blue-600">Contact our support team</span>
          </p>
        </div>
      </div>
      
      {/* Pause Account Dialog */}
      <Dialog open={pauseDialogOpen} onOpenChange={setPauseDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Pause Your Account</DialogTitle>
            <DialogDescription>
              How long would you like to pause your account?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="pause-duration">Pause Duration</Label>
              <Select value={pauseDuration} onValueChange={setPauseDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {pauseOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pause-reason">Help us improve (optional)</Label>
              <Textarea
                id="pause-reason"
                placeholder="Tell us why you're pausing your account"
                value={pauseReason}
                onChange={(e) => setPauseReason(e.target.value)}
                className="resize-none"
              />
            </div>
            
            <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-600">
              <p>Your account will automatically reactivate after {pauseDuration}. You can also reactivate manually at any time by logging back in.</p>
            </div>
          </div>
          
          <DialogFooter className="sm:flex-row-reverse sm:justify-between">
            <Button type="submit" onClick={confirmPauseAccount}>
              Pause My Account
            </Button>
            <Button variant="outline" onClick={() => setPauseDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Account Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete Your Account</DialogTitle>
            <DialogDescription>
              We're sorry to see you go. Please tell us why you're leaving:
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Please select a reason:</Label>
              <RadioGroup value={deleteReason} onValueChange={setDeleteReason}>
                {deleteReasons.map(reason => (
                  <div key={reason.value} className="flex items-center space-x-2 py-1">
                    <RadioGroupItem value={reason.value} id={reason.value} />
                    <Label htmlFor={reason.value}>{reason.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            {deleteReason === "other" && (
              <div className="space-y-2">
                <Label htmlFor="other-reason">Please specify:</Label>
                <Textarea
                  id="other-reason"
                  placeholder="Tell us more about why you're leaving"
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  className="resize-none"
                />
              </div>
            )}
            
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox 
                id="confirm-delete" 
                checked={confirmDelete}
                onCheckedChange={(checked) => 
                  setConfirmDelete(checked as boolean)
                }
              />
              <Label htmlFor="confirm-delete" className="text-sm text-gray-700">
                I understand this action cannot be undone and all my data will be permanently deleted.
              </Label>
            </div>
            
            <div className="bg-red-50 p-3 rounded-md text-sm text-red-700">
              <p>Note: If you have an active subscription, you'll need to cancel it separately through your app store or payment provider to avoid being charged.</p>
            </div>
          </div>
          
          <DialogFooter className="sm:flex-row-reverse sm:justify-between">
            <Button 
              variant="destructive" 
              type="submit" 
              onClick={confirmDeleteAccount}
            >
              Delete Account
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Final Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className={actionType === "delete" ? "text-red-600" : ""}>
              {actionType === "pause" ? "Confirm Pause Account" : "Confirm Delete Account"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "pause" 
                ? `Your account will be paused for ${pauseDuration}. Are you sure?`
                : "This action cannot be undone. Are you absolutely sure?"
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className={`p-3 rounded-md text-sm ${
              actionType === "pause" ? "bg-blue-50 text-blue-700" : "bg-red-50 text-red-700"
            }`}>
              <p className="font-medium">
                {actionType === "pause" 
                  ? "Your account will be paused immediately." 
                  : "Your account will be deleted immediately."
                }
              </p>
            </div>
          </div>
          
          <DialogFooter className="sm:flex-row-reverse sm:justify-between">
            <Button 
              variant={actionType === "pause" ? "default" : "destructive"} 
              onClick={handleFinalConfirmation}
            >
              {actionType === "pause" ? "Yes, Pause My Account" : "Yes, Delete My Account"}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setConfirmDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Success Dialog */}
      <Dialog open={confirmSuccess} onOpenChange={setConfirmSuccess}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-center mb-2">
              {actionType === "pause" ? "Account Paused" : "Account Deleted"}
            </h2>
            <p className="text-gray-600 text-center">
              {actionType === "pause" 
                ? "Your account has been paused. You can reactivate at any time by logging back in."
                : "Your account has been deleted. We're sorry to see you go."
              }
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Redirecting to home page...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PauseAccount; 