
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ApiKeyInput = ({ onApiKeySubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('apiKey');
    const newApiKey = input.value.trim();
    if (newApiKey) {
      onApiKeySubmit(newApiKey);
    }
  };

  return (
    <Card className="col-span-3 row-span-4 overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle>Google Maps Setup</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <p>To use Google Maps, you need to enter your Google Maps API key.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium mb-1">
                Google Maps API Key
              </label>
              <input
                id="apiKey"
                name="apiKey"
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your Google Maps API key"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90"
            >
              Save API Key
            </button>
          </form>
          <div className="text-sm text-muted-foreground mt-4">
            <p>To get a Google Maps API key:</p>
            <ol className="list-decimal pl-5 mt-2 space-y-1">
              <li>Go to the <a href="https://console.cloud.google.com/google/maps-apis/overview" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Cloud Platform Console</a></li>
              <li>Create a project if you don't have one</li>
              <li>Enable the "Maps JavaScript API"</li>
              <li>Create credentials to get your API key</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeyInput;
