import { prisma } from '@/lib/db';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export const revalidate = 60;
export const metadata = {
  title: 'Skills | Portfolio',
  description: 'View my technical skills and expertise',
};

async function getSkillsByCategory() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { order: 'asc' },
    });

    // Group by category
    const grouped = skills.reduce(
      (acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
      },
      {} as Record<string, typeof skills>
    );

    return grouped;
  } catch {
    return {};
  }
}

export default async function SkillsPage() {
  const skillsByCategory = await getSkillsByCategory();
  const categories = Object.keys(skillsByCategory);

  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Skills & Expertise</h1>
          <p className="text-blue-100">
            Technologies and tools I work with
          </p>
        </div>
      </div>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {categories.length > 0 ? (
            <div className="space-y-12">
              {categories.map((category) => (
                <div key={category}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skillsByCategory[category].map((skill) => (
                      <Card key={skill.id} hover>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                            <p className="text-xs text-gray-500 mt-1">{skill.category}</p>
                          </div>
                          <Badge variant="success">{skill.level}</Badge>
                        </div>

                        {/* Skill bar */}
                        <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-blue-600 rounded-full ${
                              skill.level === 'Beginner'
                                ? 'w-1/4'
                                : skill.level === 'Intermediate'
                                  ? 'w-1/2'
                                  : skill.level === 'Advanced'
                                    ? 'w-3/4'
                                    : 'w-full'
                            }`}
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No skills added yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
