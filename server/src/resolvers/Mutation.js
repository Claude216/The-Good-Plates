const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../utils');

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.user.create({
    data: {
      name: args.name,
      email: args.email,
      password: password,
      restaurants: args.restaurants
    }
  });

  console.log('inside signup')
  console.log(user)
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email }
  });
  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(
    args.password,
    user.password
  );
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user
  };
}

async function remove(parent, args, context, info) {
  const user = await context.prisma.user.delete({
    where: {
      email: args.email
    }, 
    select: {
      email: true,
      name: true,
    }
  });
  return {
    user
  }
}

async function get_restaurant(parent, args, context, info) {
  const restaurant = await context.prisma.restaurant.findUnique({
    where: {
      id: args.id
    }
  });
  
  if (restaurant) {
    return restaurant;
  }
}

async function add_to_user(parent, args, context, info) {
  const restaurant = await context.prisma.restaurant.findUnique({
    where: {
      id: args.id
    }
  });
  
  if (restaurant) {
    const user = await context.prisma.user.findUnique({
      where: {
        email: args.email
      }
    })
  
    if (user) {
      if (user.restaurants != null) {
        var temp = user.restaurants;
        var trigger = true;
        var search = [];
        if (temp == "") {
          trigger = false
        } else {
          search = temp.split(" ");
        }

        if (trigger == true) {
          for (let i = 0; i < search.length; i++) {
            if (search[i] == args.id) {
              trigger = false;
            }
          }
        }
        var arg = args.id;

        updated = temp;
        if (trigger) {
          updated = temp.concat(" ", args.id);
        } else if ((temp == "") || (temp == " ")) {
          updated = args.id;
        }
        updated.trim();
      }
      const updatedUser = await context.prisma.user.update({
        where: {
          email: args.email
        },
        data: {
          restaurants: updated
        },
      })
      return updatedUser;
    }
  }
}

async function add_restaurant(parent, args, context, info) {
  const restaurant = await context.prisma.restaurant.create({
    data: {...args}
  });
  return restaurant;

  //Go to hell you cursed piece of code. I'll be there waiting to kick your ass.
  // return {
  //   restaurant
  // }
}

module.exports = {
  signup,
  login,
  remove,
  get_restaurant,
  add_to_user,
  add_restaurant
};

