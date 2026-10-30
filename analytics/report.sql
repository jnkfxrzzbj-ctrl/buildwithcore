-- Run using the authenticated Cloudflare D1 console, never expose a public report API.
-- Test and production MUST use separate databases. These are clicks, not sales/people.
SELECT SUM(clicks) AS total_clicks FROM daily_clicks;
SELECT build,SUM(clicks) AS clicks FROM daily_clicks GROUP BY build ORDER BY clicks DESC;
SELECT build,component,SUM(clicks) AS clicks FROM daily_clicks GROUP BY build,component ORDER BY clicks DESC;
SELECT retailer,SUM(clicks) AS clicks FROM daily_clicks GROUP BY retailer ORDER BY clicks DESC;
SELECT link_type,SUM(clicks) AS clicks FROM daily_clicks GROUP BY link_type;
SELECT day,SUM(clicks) AS clicks FROM daily_clicks GROUP BY day ORDER BY day;
SELECT page,SUM(clicks) AS clicks FROM daily_clicks GROUP BY page ORDER BY clicks DESC;
