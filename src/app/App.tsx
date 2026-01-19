import { BrowserRouter } from "react-router-dom";
import {AppRoutes} from "./routes/AppRoutes.tsx";
import {QueryProvider} from "./providers/QueryProvider.tsx";


export function App() {
  return (
      <QueryProvider>
          <BrowserRouter>
              <AppRoutes/>
          </BrowserRouter>
      </QueryProvider>

  )
}


