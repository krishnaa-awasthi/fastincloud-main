// App.tsx
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import Home from "./pages/Home";
import NotFound from "./pages/not-found";
import CookieConsent from "./components/CookieConsent";

// Import your new DPDP compliance and legal pages
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import SecurityPage from "./pages/SecurityPage";
import GrievancePage from "./pages/GrievancePage";
import DSARPage from "./pages/DSARPage";

/*
import BlogsPage from "@/pages/BlogsPage";
import SmartData from "./pages/SmartData";
import DemandGeneration from "./pages/DemandGeneration";
import EventAudienceOutreach from "./pages/EventAudienceOutreach";
*/

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      
      {/* Legal & Compliance Routes */}
      <Route path="/privacy-policy" component={PrivacyPolicyPage} />
      <Route path="/terms-of-service" component={TermsOfServicePage} />
      <Route path="/cookie-policy" component={CookiePolicyPage} />
      <Route path="/security" component={SecurityPage} />
      <Route path="/grievance" component={GrievancePage} />
      <Route path="/privacy-request" component={DSARPage} />

      {/* <Route path="/blogs" component={BlogsPage} /> */}
      {/*<Route path="/smart-data" component={SmartData} />
      <Route path="/demand-generation" component={DemandGeneration}/>
      <Route path="/eventAudience-outreach" component={EventAudienceOutreach}/>
      */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <CookieConsent />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
export default App;