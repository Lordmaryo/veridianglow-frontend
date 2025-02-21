import { useAuthStore } from "../stores/useAuthStore";
import { Link } from "react-router-dom";

const Account = () => {
  const { user } = useAuthStore();
  return (
    <div className="space-y-4 max-w-[600px]">
      <h3>
        Hello <span className="font-bold">{user?.firstName},</span>
      </h3>
      <p>
        From your account dashboard you can view your
        <Link className="font-bold" to={"/customer/account/orders"}>
          {" "}
          recent orders
        </Link>
        ,
        <Link className="font-bold" to={"/customer/account/address"}>
          {" "}
          manage your addresses
        </Link>{" "}
        , and also make edits on them.
      </p>
    </div>
  );
};

export default Account;
