import React, {useState} from 'react'
import axios from "axios"


export default function PrivateData() {
  const [data, setData] = useState(null)
  const requestData = async () => {
  try {
    const {data} = await axios("/api/auth/profile", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    console.log(data);
    setData(data.protectedData)
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>
      Private Data Page
      <div className="text-center p-4">
        <button className=" btn btn-outline-primary" onClick={requestData}>
          Request protected data
        </button>
      </div>
      {data && (
        <div className="text-center p-4">
          <div className="alert">{data}</div>
        </div>
      )}
    </div>
  )
}
