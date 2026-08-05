const About = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(80vh-4rem)]">
            <h1 className="text-3xl text-brown font-heading my-8"> About TalkOverTheTable </h1>
            <div className="text-center max-w-2xl text-2xl border-4 rounded-3xl bg-card border-brown text-ink px-6 py-6 font-body">
                {"TalkOverTheTable is a web app developed by Phillipe ('Phil') Manio, a self-proclaimed foodie, who loves to yap. Phil wanted to create a web app where foodies can yap about food from a broad range of topics: recipes, food places, food hacks, or just food in general. He hopes to create a community of foodies who can come together and yap all the food they love."}
            </div>
        </div>
    )
}

export default About