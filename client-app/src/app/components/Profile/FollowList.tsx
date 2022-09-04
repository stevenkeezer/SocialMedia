const people = [
  {
    name: "Michael Foster",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
  {
    name: "Michael Foster",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
];

export default function FollowList({ followings }) {
  return (
    <div className="bg-transparent">
      <div className=" mx-auto text-center">
        <div className="space-y-8 sm:space-y-12">
          <ul
            role="list"
            className="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-5 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12"
          >
            {followings.map((person) => (
              <li key={person.name} className="list-none">
                <img
                  className="mx-auto h-16 w-16 rounded-lg"
                  src={person.image}
                  alt=""
                />

                <div className="text-xs pt-2 font-medium lg:text-sm">
                  <h3>{person.displayName}</h3>
                  <p className="text-indigo-600">{person.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
