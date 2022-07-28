const Base = artifacts.require("base")


contract('Base', (accounts) => {
    before(async () => {
        base = await Base.deployed()
    })

    it("Ensure the project was created successfully", async () => {
        const nameOfProject = "Toilet Rebuilding"
        const expectedAmt = 25 
        const startDate = 2
        const endDate = '8y'

        let newProject = await base.createProject(nameOfProject, expectedAmt, startDate, endDate)
        let projects = await base.getProjects()
        // assert.isArray(newProject, 'Array of the function parameters')
        console.log(newProject)
        console.log(projects)
    })
})