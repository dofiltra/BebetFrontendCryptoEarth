import { useEffect } from "react";
import { apiInstance } from "@/shared/api";

export const AdminPage = () => {
  useEffect(() => {
    apiInstance.get('/api/v1/ref_admin/users', {
      withCredentials: true,
    }).then(res => {
      console.log(res)
    })
  }, []);
  return (
    <div>
      Admin page
    </div>
  )
}
