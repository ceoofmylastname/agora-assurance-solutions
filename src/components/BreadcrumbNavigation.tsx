
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { getBreadcrumbsForPath } from '@/utils/seo/breadcrumbSchema';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const BreadcrumbNavigation = () => {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbsForPath(location.pathname);

  // Don't show breadcrumbs on homepage
  if (location.pathname === '/' || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <div className="bg-gray-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={breadcrumb.url}>
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage className="text-gray-500">
                      {breadcrumb.name === 'Home' ? (
                        <Home className="h-4 w-4" />
                      ) : (
                        breadcrumb.name
                      )}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link 
                        to={breadcrumb.url}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {breadcrumb.name === 'Home' ? (
                          <Home className="h-4 w-4" />
                        ) : (
                          breadcrumb.name
                        )}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default BreadcrumbNavigation;
