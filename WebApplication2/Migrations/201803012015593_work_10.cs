namespace WebApplication2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class work_10 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Sample", "TimeZoneId", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Sample", "TimeZoneId");
        }
    }
}
