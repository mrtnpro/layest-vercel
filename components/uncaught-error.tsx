import { Button } from "./ui/button";

export interface UncaugtErrorProps {
  onReset?: () => void;
}

export default function UncaughtError(props: UncaugtErrorProps) {
  const handleReloadPage = () => location.reload();

  return (
    <div className="grid gap-4">
      <h2>Something went wrong!</h2>

      <nav className="flex gap-4">
        {props.onReset && <Button onClick={props.onReset}>Try again</Button>}

        <Button variant="outline" onClick={handleReloadPage}>
          Reload page
        </Button>
      </nav>
    </div>
  );
}
