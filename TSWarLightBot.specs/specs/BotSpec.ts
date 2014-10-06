﻿/**
 * Warlight AI Game Bot
 *
 * Oktober 2014
 *
 * Based on Niko van Meurs javascript bot from http://theaigames.com/competitions/warlight-ai-challenge/getting-started
 *
 * @authors Marcel van der Kamp and Taeke van der Veen
 * @License MIT License (http://opensource.org/Licenses/MIT)
 */
/// <reference path="../Scripts/typings/jasmine/legacy/jasmine-1.3.d.ts" />


import readline = require('readline');
import IBot = require('../../TSWarLightBot/IBot');

describe("bot.test", () => {
    var Bot: any = require("../../TSWarLightBot/Bot");
    var bot: IBot;
    var io: any = jasmine.createSpyObj('io', ['on']);
    var botCommands: any = jasmine.createSpyObj('botCommands', ['isACommand', 'callCommand']);
    var lineListener: (data: string) => void;

    io.on.andCallFake(function (event: string, listener: (data: string) => void) {
        if (event === 'line') {
            lineListener = listener;
        }
    });

    beforeEach(() => {
        bot = new Bot(io, botCommands);
    });

    it("Should call on on io with specific arguments.", () => {
        // arange

        // act
        bot.run();

        // assert
        expect(io.on).toHaveBeenCalledWith('line', jasmine.any(Function));
        expect(io.on).toHaveBeenCalledWith('close', jasmine.any(Function));
        expect(io.on.callCount).toBe(2);
    });

    it("Should call method on botCommands if commandName matches for calling on line listener", () => {
        // arange
        botCommands.isACommand.andReturn(true);

        // act
        bot.run();

        // assert
        lineListener('callCommand');
        expect(botCommands.callCommand).toHaveBeenCalled();
        expect(botCommands.callCommand.callCount).toBe(1);
    });
});   