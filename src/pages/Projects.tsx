import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { projects } from '@/data';
import type { Page } from '@/App';

interface ProjectsProps {
  navigate: (page: Page) => void;
}

export default function Projects({ navigate }: ProjectsProps) {
  const formatPrice = (price?: number) => {
    if (!price) return '';
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-NG', {
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-beige pb-20">
      {/* Header */}
      <div className="bg-beige-light border-b border-ash/10">
        <div className="container-wide py-8 md:py-12">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ash mb-4">
            Our Projects
          </h1>
          <p className="text-ash/70 max-w-xl">
            Explore our portfolio of completed projects across Nigeria. From corporate offices to luxury residences, see how we transform spaces.
          </p>
        </div>
      </div>

      <div className="container-wide py-12 md:py-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: '500+', label: 'Projects Completed' },
            { value: '15+', label: 'Years Experience' },
            { value: '50+', label: 'Corporate Clients' },
            { value: '25+', label: 'Cities Served' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 bg-white rounded-lg shadow-soft">
              <div className="font-display text-3xl md:text-4xl font-semibold text-ash mb-2">
                {stat.value}
              </div>
              <div className="text-ash/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-elevated transition-shadow"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 custom-expo group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="bg-ash/10 text-ash">
                    {project.category}
                  </Badge>
                </div>
                <h3 className="font-display text-xl font-semibold text-ash mb-2">
                  {project.title}
                </h3>
                <p className="text-ash/60 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-ash/50 mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(project.completionDate)}
                  </span>
                </div>
                {project.value && (
                  <div className="pt-4 border-t border-ash/10">
                    <span className="text-ash/60 text-sm">Project Value:</span>
                    <span className="font-medium text-ash ml-2">{formatPrice(project.value)}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-ash/70 mb-6">
            Have a project in mind? Let's discuss how we can help.
          </p>
          <Button
            onClick={() => navigate('contact')}
            className="bg-ash text-beige hover:bg-ash-light"
          >
            Start Your Project
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
