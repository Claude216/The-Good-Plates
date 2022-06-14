// async function feed(parent, args, context, info) {
//   const where = args.filter
//     ? {
//         OR: [
//           { description: { contains: args.filter } },
//           { url: { contains: args.filter } }
//         ]
//       }
//     : {};

//   const links = await context.prisma.link.findMany({
//     where,
//     skip: args.skip,
//     take: args.take,
//     orderBy: args.orderBy
//   });

//   const count = await context.prisma.link.count({ where });

//   return {
//     id: 'main-feed',
//     links,
//     count
//   };
// }

async function getName(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email }
  });
  if (!user) {
    alert('No such user found!')
    throw new Error('No such user found');
  }
  console.log('GETNAME user name is ', user.name)
  return {
    user
  };
}

module.exports = {
  //feed,
  getName
};
