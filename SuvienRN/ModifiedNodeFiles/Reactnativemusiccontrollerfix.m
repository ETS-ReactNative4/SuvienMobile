//
//  RNReactNativeMusicplayercontroller.m
//
//  Created by Kjell Connelly on 2/20/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "RNReactNativeMusicplayercontroller.h"

@implementation RNReactNativeMusicplayercontroller
RCTResponseSenderBlock savedCallback;
MPMusicPlayerController *musicPlayer;


RCT_EXPORT_MODULE();

//////////////////////////////////////////////////////////////////////
// Media Picker

RCT_EXPORT_METHOD(presentPicker: (RCTResponseSenderBlock)callback) {
    savedCallback = callback;
    
#if TARGET_IPHONE_SIMULATOR
    savedCallback(@[[NSNumber numberWithInt:2], @[]]);
#else
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *topViewController = [[[UIApplication sharedApplication] keyWindow] rootViewController];
        while (true) {
            if (topViewController.presentedViewController) {
                topViewController = topViewController.presentedViewController;
            } else if ([topViewController isKindOfClass:[UINavigationController class]]) {
                UINavigationController *nav = (UINavigationController *)topViewController;
                topViewController = nav.topViewController;
            } else if ([topViewController isKindOfClass:[UITabBarController class]]) {
                UITabBarController *tab = (UITabBarController *)topViewController;
                topViewController = tab.selectedViewController;
            } else {
                break;
            }
        }
        
        MPMediaPickerController *picker = [[MPMediaPickerController alloc] initWithMediaTypes:MPMediaTypeMusic];
        [picker setShowsCloudItems:false];
        [picker setAllowsPickingMultipleItems:false];
        if ([picker respondsToSelector:@selector(setShowsItemsWithProtectedAssets:)]) {
            [picker setShowsItemsWithProtectedAssets:false];
        }
        [picker setDelegate:self];
        [topViewController presentViewController:picker animated:true completion:^{}];
    });
#endif
}

//////////////////////////////////////////////////////////////////////
// MPMusicPlayerController

RCT_EXPORT_METHOD(preloadMusic: /*(NSString *)songTitle:(NSString *)songAlbumTitle:(NSNumber *)playbackDuration:*/(NSArray *)information:(RCTResponseSenderBlock)callback) {
    //if ([[NSUserDefaults standardUserDefaults] valueForKey:@"mediaItemCollection"] != nil) {
        //dispatch_async(dispatch_get_main_queue(), ^{NSNumberFormatter *f = [[NSNumberFormatter alloc] init];
            //NSNumber *persistenID = [[NSDecimalNumber alloc] initWithString:persistID];
            //NSNumberFormatter * numberFormatter = [[NSNumberFormatter alloc] init];
            //NSNumber * playbackdur = [numberFormatter numberFromString:information[2]];
            //NSMutableArray *songItem = [[NSMutableArray alloc] init];
            //[songItem addObject:persistID];
            //NSString *selectedTitle = [songItem objectAtIndex:0];
            //NSNumber *thing = [NSNumber numberWithLongLong:5609467967152999000];
            NSString *title = information[0];
            NSString *album = information[1];
            NSString *artist = information[3];
            MPMediaPropertyPredicate *titlepredicate = [MPMediaPropertyPredicate predicateWithValue: title forProperty:MPMediaItemPropertyTitle];
            MPMediaPropertyPredicate *albumpredicate = [MPMediaPropertyPredicate predicateWithValue: album forProperty:MPMediaItemPropertyAlbumTitle];
            //MPMediaPropertyPredicate *playbackpredicate = [MPMediaPropertyPredicate predicateWithValue: playbackdur forProperty:MPMediaItemPropertyPlaybackDuration];
            MPMediaPropertyPredicate *artistpredicate = [MPMediaPropertyPredicate predicateWithValue: artist forProperty:MPMediaItemPropertyArtist];
            MPMediaQuery *mySongQuery = [[MPMediaQuery alloc] init];
            [mySongQuery addFilterPredicate:titlepredicate];
            [mySongQuery addFilterPredicate: albumpredicate];
            //[mySongQuery addFilterPredicate: artistpredicate];
            NSNumber *itemc = [NSNumber numberWithInt: mySongQuery.items.count];
            /*NSData *newdata = [musicPath dataUsingEncoding:NSUTF8StringEncoding];
            NSData *data = [[NSUserDefaults standardUserDefaults] valueForKey:@"mediaItemCollection"];
            NSString *datastrings = [[NSString alloc] initWithData:data encoding:NSASCIIStringEncoding];
            NSData *data2 = [datastrings dataUsingEncoding:NSASCIIStringEncoding];
            MPMediaItemCollection *mediaItemCollection = [NSKeyedUnarchiver unarchiveObjectWithData:data];
            NSArray *metadata = [self createMetadataFor:mediaItemCollection];*/
            musicPlayer = [MPMusicPlayerController applicationMusicPlayer];
            if (musicPlayer == nil) {
                callback(@[[NSNumber numberWithInteger:1], @[]]);
            } else {
                [musicPlayer setRepeatMode:MPMusicRepeatModeAll];
                /*
                if ([repeatMode isEqualToString:@"none"]) {
                    [musicPlayer setRepeatMode:MPMusicRepeatModeNone];
                } else if ([repeatMode isEqualToString:@"one"]) {
                    [musicPlayer setRepeatMode:MPMusicRepeatModeOne];
                } else if ([repeatMode isEqualToString:@"all"]) {
                    [musicPlayer setRepeatMode:MPMusicRepeatModeAll];
                } else {
                    [musicPlayer setRepeatMode:MPMusicRepeatModeDefault];
                }*/
                //Replace the below line with:
                [musicPlayer setQueueWithQuery:mySongQuery];
                //[musicPlayer setQueueWithItemCollection:mediaItemCollection]; //*
                /*[musicPlayer prepareToPlayWithCompletionHandler:^(NSError * _Nullable error) {
                    if (error) {
                        callback(@[[NSNumber numberWithInteger:1], @[]]);
                    } else {
                        callback(@[[NSNumber numberWithInteger:0], @"Hurray! It worked!"]);
                    }
                }];*/
                [musicPlayer play];
            }
        //});
    //} else {
        //callback(@[[NSNumber numberWithInteger:1], @[]]);
    //}
}

RCT_EXPORT_METHOD(playMusic: (RCTResponseSenderBlock)callback) {
    if (musicPlayer != nil) {
        callback(@[[NSNumber numberWithInteger:0], @[]]);
        dispatch_async(dispatch_get_main_queue(), ^{
            [musicPlayer play];
        });
    } else {
        callback(@[[NSNumber numberWithInteger:1], @[]]);
    }
}

RCT_EXPORT_METHOD(stopMusic: (RCTResponseSenderBlock)callback) {
    if (musicPlayer != nil) {
        callback(@[[NSNumber numberWithInteger:0], @[]]);
        [musicPlayer stop];
    } else {
        callback(@[[NSNumber numberWithInteger:1], @[]]);
    }
}

RCT_EXPORT_METHOD(pauseMusic: (RCTResponseSenderBlock)callback) {
    if (musicPlayer != nil) {
        callback(@[[NSNumber numberWithInteger:0], @[]]);
        [musicPlayer pause];
    } else {
        callback(@[[NSNumber numberWithInteger:1], @[]]);
    }
}

RCT_EXPORT_METHOD(isPlaying: (RCTResponseSenderBlock)callback) {
    if (musicPlayer != nil) {
        if ([musicPlayer playbackState] == MPMusicPlaybackStatePlaying) {
            callback(@[[NSNumber numberWithInteger:0], @[]]);
        } else {
            callback(@[[NSNumber numberWithInteger:1], @[]]);
        }
    } else {
        callback(@[[NSNumber numberWithInteger:1], @[]]);
    }
}


//////////////////////////////////////////////////////////////////////
// Delegate Methods

- (void)mediaPickerDidCancel:(MPMediaPickerController *)mediaPicker {
    [mediaPicker dismissViewControllerAnimated:true completion:^{
        savedCallback(@[[NSNumber numberWithInt:1], @[]]);
    }];
}

- (void)mediaPicker:(MPMediaPickerController *)mediaPicker didPickMediaItems:(MPMediaItemCollection *)mediaItemCollection {
    // saving collection as NSData, then to NSUserDefaults
    /*
    NSData *data = [NSKeyedArchiver archivedDataWithRootObject:mediaItemCollection];
    [[NSUserDefaults standardUserDefaults] setObject:data forKey:@"mediaItemCollection"];
    */
    
    // Creating metadata
    NSArray *metadata = [self createMetadataFor:mediaItemCollection];
    
    // Callback
    [mediaPicker dismissViewControllerAnimated:true completion:^{
        savedCallback(@[[NSNumber numberWithInt:0], metadata]);
    }];
}

//////////////////////////////////////////////////////////////
// Helper Methods

- (NSArray *) createMetadataFor : (MPMediaItemCollection *) mediaItemCollection {
    NSMutableArray *metadata = [[NSMutableArray alloc] init];
    for (int i = 0; i < mediaItemCollection.items.count; i++) {
        MPMediaItem *item = mediaItemCollection.items[i];
        [metadata addObject:@{
                              @"artist" : item.artist,
                              @"title" : item.title,
                              @"albumTitle" : item.albumTitle,
                              @"playbackDuration" : @(item.playbackDuration),
                              }];
    }
    return metadata;
}

@end
