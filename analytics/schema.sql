-- Only aggregate dimensions and short-lived random EVENT IDs; never visitor IDs.
CREATE TABLE IF NOT EXISTS daily_clicks (
 day TEXT NOT NULL, build TEXT NOT NULL, component TEXT NOT NULL,
 retailer TEXT NOT NULL, link_type TEXT NOT NULL, page TEXT NOT NULL,
 clicks INTEGER NOT NULL CHECK(clicks > 0),
 PRIMARY KEY(day,build,component,retailer,link_type,page)
) WITHOUT ROWID;
CREATE TABLE IF NOT EXISTS seen_events (id TEXT PRIMARY KEY, expires INTEGER NOT NULL) WITHOUT ROWID;
CREATE INDEX IF NOT EXISTS seen_expiry ON seen_events(expires);
