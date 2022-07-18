namespace WebApplication2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class work_6 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ServiceCenter", "EditionDateTime", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ServiceCenter", "EditionDateTime");
        }
    }
}
