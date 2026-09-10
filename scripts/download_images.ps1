$imageMap = @{
    "assets/images/hero/hero-museum.jpg" = "photo-1518998053401-b5646ebfd9bb"
    "assets/images/exhibitions/exhibition-01.jpg" = "photo-1544257121-ea1c6db5c898"
    "assets/images/exhibitions/exhibition-02.jpg" = "photo-1582555172866-f73bb12a2ab3"
    "assets/images/exhibitions/exhibition-03.jpg" = "photo-1563123895-3eb97c11f71a"
    "assets/images/exhibitions/exhibition-04.jpg" = "photo-1533038590840-1cde6e668a8f"
    "assets/images/collection/artwork-01.jpg" = "photo-1579783902614-a3fb3927b6a5"
    "assets/images/collection/artwork-02.jpg" = "photo-1578301978018-3005759f48f7"
    "assets/images/collection/artwork-03.jpg" = "photo-1579783900882-c0d0508120c8"
    "assets/images/collection/artwork-04.jpg" = "photo-1549490349-8643362247b5"
    "assets/images/collection/artwork-05.jpg" = "photo-1513364776144-60967b0f800f"
    "assets/images/collection/artwork-06.jpg" = "photo-1549887552-cb1071d3e5ca"
    "assets/images/artists/artist-01.jpg" = "photo-1544005313-94ddf0286df2"
    "assets/images/artists/artist-02.jpg" = "photo-1506794778202-cad84cf45f1d"
    "assets/images/artists/artist-03.jpg" = "photo-1531746020798-e6953c6e8e04"
    "assets/images/artists/artist-04.jpg" = "photo-1500648767791-00dcc994a43e"
    "assets/images/artists/artist-05.jpg" = "photo-1534528741775-53994a69daeb"
    "assets/images/architecture/museum-exterior.jpg" = "photo-1580979685934-118835560cb6"
    "assets/images/architecture/gallery-interior.jpg" = "photo-1561578351-d41c888636b1"
    "assets/images/architecture/sculpture-hall.jpg" = "photo-1561089279-d652613bfa70"
    "assets/images/architecture/reading-room.jpg" = "photo-1507842217343-583bb7270b66"
    "assets/images/events/event-01.jpg" = "photo-1505373877841-8d25f7d46678"
    "assets/images/events/event-02.jpg" = "photo-1540575467063-178a50c2df87"
    "assets/images/events/event-03.jpg" = "photo-1517457373958-b7bdd4587205"
    "assets/images/journal/journal-01.jpg" = "photo-1499781350541-7783f6c6a0c8"
    "assets/images/journal/journal-02.jpg" = "photo-1513364776144-60967b0f800f"
    "assets/images/journal/journal-03.jpg" = "photo-1493612276216-ee3925520721"
    "assets/images/journal/journal-04.jpg" = "photo-1526304640581-d334cdbbf45e"
}

$imageMap.GetEnumerator() | ForEach-Object {
    $key = $_.Key
    $unsplashId = $_.Value
    $localPath = Join-Path $PWD $key
    $dir = Split-Path $localPath -Parent

    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }

    $url = "https://images.unsplash.com/$unsplashId?auto=format&fit=crop&w=1200&q=80"
    Write-Host "Downloading $($url) to $($localPath)"
    try {
        Invoke-WebRequest -Uri $url -OutFile $localPath -UseBasicParsing
    } catch {
        Write-Host "Failed to download $url"
    }
}
Write-Host "Done downloading images."
