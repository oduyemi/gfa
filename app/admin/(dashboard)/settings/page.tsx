
import { CardSettings } from "@/components/admin/Cards/CardSettings";
import { CardProfile } from "@/components/admin/Cards/CardProfile";

export default function SettingsPage() {
  return (
    <div className="flex flex-wrap">
      <div className="w-full px-4 lg:w-8/12">
        <CardSettings />
      </div>

      <div className="w-full px-4 lg:w-4/12">
        <CardProfile />
      </div>
    </div>
  );
}
