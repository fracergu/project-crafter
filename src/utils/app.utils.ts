export const generateFunnyName = () => {
  const adjectives = [
    'amazing',
    'pretty',
    'giant',
    'mysterious',
    'shiny',
    'flying',
    'invisible',
    'tiny',
    'angry',
    'sleepy',
  ]
  const colors = [
    'red',
    'green',
    'blue',
    'yellow',
    'purple',
    'pink',
    'black',
    'white',
    'orange',
    'brown',
  ]
  const nouns = [
    'unicorn',
    'tortoise',
    'dragon',
    'spaceship',
    'robot',
    'ninja',
    'pirate',
    'alien',
    'monster',
    'zombie',
  ]

  const pickRandom = (list: string[]) =>
    list[Math.floor(Math.random() * list.length)]

  return `${pickRandom(adjectives)}-${pickRandom(colors)}-${pickRandom(nouns)}`
}
