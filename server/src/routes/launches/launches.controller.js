const { getAllLaunches, scheduleNewLaunch, abortLaunchById, existsLaunchWithId } = require('../../models/launches.model');
const { exists } = require('../../models/launches.mongo');

async function httpGetAllLaunches(req, res) {
    console.log('httpGetAllLaunches');
    const launches = await getAllLaunches();
    return res.status(200).json(launches);
}

async function httpScheduleNewLaunch(req, res) {
    const launch = req.body;

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing required launch property',
        });
    }
    if (isNaN(Date.parse(launch.launchDate))) {
        return res.status(400).json({
            error: 'Invalid launch date',
        });
    }
    launch.launchDate = new Date(launch.launchDate);
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);
    console.log('httpAbortLaunch', launchId);

    const existsLaunch = await existsLaunchWithId(launchId);

    if (!existsLaunch) {
        return res.status(404).json({
            error: 'Launch not found',
        });
    }

    const aborted = await abortLaunchById(launchId);
    if (!aborted) {
        return res.status(400).json({
            error: 'Launch not found',
        });
    }
    return res.status(200).json({
        ok: true,
    });
}

module.exports = {
    httpGetAllLaunches,
    httpScheduleNewLaunch,
    httpAbortLaunch
};