import React from "react";
interface IAlert {
  isDefaultShown: boolean;
  timeout: number;
  type: any;
  message: string | number;
}
export const Alert = ({
  isDefaultShown = false,
  timeout = 250,
  type,
  message,
}: IAlert) => {
  const [isShown, setIsShown] = React.useState(isDefaultShown);
  const [isLeaving, setIsLeaving] = React.useState(false);

  let timeoutId: null | any = null;

  React.useEffect(() => {
    setIsShown(true);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isDefaultShown, timeout, timeoutId]);

  const closeAlert = () => {
    setIsLeaving(true);
    timeoutId = setTimeout(() => {
      setIsLeaving(false);
      setIsShown(false);
    }, timeout);
  };

  return (
    isShown && (
      <div
        className={`alert${type} ${isLeaving ? "leaving" : ""}`}
        role="alert"
      >
        <button className="close" onClick={closeAlert} />
        {message}
      </div>
    )
  );
};

// Use

{
  /* <Alert type="info" message="This is info" /> */
}
