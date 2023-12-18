import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import AuthButton from "../buttons/AuthButton";
import {getUsernameAndAccessToken} from "@/lib/api";

export default function Topbar() {
  const {username, accessToken} = getUsernameAndAccessToken();

  return (
    <nav className=" flex fixed top-0 w-full z-50 justify-center backdrop-blur-md border-b ">
      <div className=" max-w-7xl flex w-full p-2 justify-between items-center">
        <div className=" w-1/6 min-w-max  ">
          <Image
            src="https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/qp8rxi2jae4uinry2dv7"
            width={50}
            height={20}
            alt="Picture of the author"
          />
        </div>
        <div className="flex gap-2 w-1/6 min-w-[1/6]  items-center justify-center">
          <Link href="/" className="text-primary">
            <Button variant="outline" className="border-primary w-24">
              HOME
            </Button>
          </Link>
          <Link
            href="/listings/15081995"
            className="text-primary  hidden md:block"
          >
            <Button variant="outline" className="border-primary w-24">
              LISTINGS
            </Button>
          </Link>
          {accessToken ? (
            <Link href="/dashboard" className="text-primary hidden md:block">
              <Button
                data-cy="listings"
                variant="outline"
                className="border-primary w-24"
              >
                DASHBOARD
              </Button>
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className="flex w-1/6 min-w-max justify-end">
          <AuthButton accessToken={accessToken} username={username} />
        </div>
      </div>
    </nav>
  );
}
