
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    let workspace = await prisma.workspace.findFirst();
    if (!workspace) {
        // Create a dummy user if needed
        let user = await prisma.user.findFirst();
        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: 'test-script@example.com',
                    passwordHash: 'hashedpassword',
                    name: 'Test Script User'
                }
            });
        }

        workspace = await prisma.workspace.create({
            data: {
                name: 'Test Workspace',
                userId: user.id,
            },
        });
    }
    console.log(workspace.id);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
