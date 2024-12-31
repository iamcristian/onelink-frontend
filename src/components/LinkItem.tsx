import { Link } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface LinkItemProps {
  link: Link;
}

const LinkItem = ({ link }: LinkItemProps) => {
  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2"
        >
          {link.icon && (
            <img src={link.icon} alt={link.title} className="w-6 h-6" />
          )}
          <span className="text-lg font-medium">{link.title}</span>
        </a>
      </CardContent>
    </Card>
  );
};

export default LinkItem;
