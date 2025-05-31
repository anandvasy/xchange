import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

async function main() {
  // Clear existing test data
  await prisma.communityMember.deleteMany({
    where: { user: { email: { endsWith: '@xchange.edu' } } }
  });
  await prisma.community.deleteMany({});
  await prisma.user.deleteMany({
    where: { 
      OR: [
        { email: { endsWith: '@xchange.edu' } },
        { email: 'anandvas@ucberkeley.edu' }
      ]
    }
  });

  // Create personal test account
  const personalUser = await prisma.user.create({
    data: {
      email: 'anandvas@ucberkeley.edu',
      password: await hashPassword('elpp2019'),
      name: 'Anand Vas',
      role: 'STUDENT'
    }
  });

  // Create test users
  const studentUser = await prisma.user.create({
    data: {
      email: 'student@xchange.edu',
      password: await hashPassword('Student123!'),
      name: 'Test Student',
      role: 'STUDENT'
    }
  });

  const leaderUser = await prisma.user.create({
    data: {
      email: 'leader@xchange.edu',
      password: await hashPassword('Leader123!'),
      name: 'Student Leader',
      role: 'STUDENT_LEADER'
    }
  });

  const internationalUser = await prisma.user.create({
    data: {
      email: 'international@xchange.edu',
      password: await hashPassword('Global123!'),
      name: 'International Student',
      role: 'STUDENT'
    }
  });

  const professorUser = await prisma.user.create({
    data: {
      email: 'professor@xchange.edu',
      password: await hashPassword('Prof123!'),
      name: 'Professor Test',
      role: 'FACULTY'
    }
  });

  const deptHeadUser = await prisma.user.create({
    data: {
      email: 'department.head@xchange.edu',
      password: await hashPassword('Head123!'),
      name: 'Department Head',
      role: 'FACULTY_ADMIN'
    }
  });

  const moderatorUser = await prisma.user.create({
    data: {
      email: 'moderator@xchange.edu',
      password: await hashPassword('Mod123!'),
      name: 'Content Moderator',
      role: 'MODERATOR'
    }
  });

  // Create test communities
  const csComm = await prisma.community.create({
    data: {
      name: 'Computer Science',
      description: 'Academic community for CS students and faculty',
      type: 'ACADEMIC',
      accessType: 'PUBLIC',
      createdById: professorUser.id
    }
  });

  const chessClub = await prisma.community.create({
    data: {
      name: 'Chess Club',
      description: 'Community for chess enthusiasts',
      type: 'CLUB',
      accessType: 'PUBLIC',
      createdById: leaderUser.id
    }
  });

  const researchLab = await prisma.community.create({
    data: {
      name: 'Research Lab',
      description: 'Private research community',
      type: 'ACADEMIC',
      accessType: 'PRIVATE',
      createdById: professorUser.id
    }
  });

  const intlSociety = await prisma.community.create({
    data: {
      name: 'International Society',
      description: 'Community for international students',
      type: 'CULTURAL',
      accessType: 'PUBLIC',
      createdById: internationalUser.id
    }
  });

  const debateClub = await prisma.community.create({
    data: {
      name: 'Debate Club',
      description: 'Community for debate enthusiasts',
      type: 'CLUB',
      accessType: 'PUBLIC',
      createdById: leaderUser.id
    }
  });

  // Create personal interest communities
  const leadershipComm = await prisma.community.create({
    data: {
      name: 'Leadership Development',
      description: 'Community for developing leadership skills and discussing leadership topics',
      type: 'PROFESSIONAL',
      accessType: 'PUBLIC',
      createdById: personalUser.id
    }
  });

  const aiComm = await prisma.community.create({
    data: {
      name: 'Artificial Intelligence',
      description: 'Exploring the latest in AI, machine learning, and their applications',
      type: 'ACADEMIC',
      accessType: 'PUBLIC',
      createdById: professorUser.id
    }
  });

  const cricketComm = await prisma.community.create({
    data: {
      name: 'Cricket Club',
      description: 'Community for cricket enthusiasts - players and fans alike',
      type: 'SPORTS',
      accessType: 'PUBLIC',
      createdById: personalUser.id
    }
  });

  // Create community memberships
  const communities = [
    csComm, 
    chessClub, 
    researchLab, 
    intlSociety, 
    debateClub,
    leadershipComm,
    aiComm,
    cricketComm
  ];
  
  const users = [
    personalUser,
    studentUser, 
    leaderUser, 
    internationalUser, 
    professorUser, 
    deptHeadUser
  ];

  for (const community of communities) {
    for (const user of users) {
      // Make personal user admin of their interest communities
      const isAdmin = user.id === community.createdById || 
        (user.id === personalUser.id && 
         [leadershipComm.id, cricketComm.id, aiComm.id].includes(community.id));
      
      await prisma.communityMember.create({
        data: {
          userId: user.id,
          communityId: community.id,
          role: isAdmin ? 'ADMIN' : 'MEMBER'
        }
      });
    }
  }

  console.log('Test data seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 